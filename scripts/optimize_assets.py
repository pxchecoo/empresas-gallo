"""Build web assets without modifying originals. Requires cwebp, ffmpeg and ffprobe."""
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
OUTPUT = ASSETS / 'optimized'
OUTPUT.mkdir(exist_ok=True)
references = '\n'.join((ROOT / name).read_text() for name in ('index.html', 'style.css', 'script.js'))
report = []
for source in sorted(ASSETS.iterdir()):
    if source.suffix.lower() not in ('.png', '.jpg', '.jpeg', '.mp4'):
        continue
    if source.suffix != '.mp4' and (source.name not in references and source.stem + '.webp' not in references or 'favicon' in source.name or 'apple-touch' in source.name):
        continue
    video = source.suffix == '.mp4'
    target = OUTPUT / (source.stem + ('.mp4' if video else '.webp'))
    if not target.exists() or target.stat().st_mtime < max(source.stat().st_mtime, Path(__file__).stat().st_mtime):
        if video:
            subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', str(source),
                '-map', '0:v:0', '-map', '0:a?', '-vf', "scale=w='min(1280,iw)':h='min(1280,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2",
                '-c:v', 'libx264', '-preset', 'medium', '-crf', '25', '-maxrate', '2M', '-bufsize', '4M', '-pix_fmt', 'yuv420p',
                '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', str(target)], check=True)
        else:
            subprocess.run(['cwebp', '-quiet', '-q', '82', '-m', '6', str(source), '-o', str(target)], check=True)
    if video:
        poster = OUTPUT / (source.stem + '-poster.jpg')
        if not poster.exists():
            subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', str(target),
                '-frames:v', '1', '-vf', 'scale=480:-1', '-q:v', '3', str(poster)], check=True)
    report.append({'source': source.name, 'original_bytes': source.stat().st_size, 'optimized_bytes': target.stat().st_size})
    print(f'{source.name}: {source.stat().st_size:,} → {target.stat().st_size:,}', flush=True)
(OUTPUT / 'sizes.json').write_text(json.dumps(report, indent=2) + '\n')
