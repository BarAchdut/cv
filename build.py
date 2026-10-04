import os, re
root = os.path.dirname(os.path.abspath(__file__))
src = lambda p: open(os.path.join(root, 'src', p), encoding='utf8').read()
names = {"Inter":"Inter","Poppins":"Poppins","Montserrat":"Montserrat","Roboto":"Roboto","OpenSans":"Open Sans","Rubik":"Rubik","Manrope":"Manrope","DMSans":"DM Sans","PlusJakartaSans":"Plus Jakarta Sans","WorkSans":"Work Sans","Figtree":"Figtree","SpaceGrotesk":"Space Grotesk","IBMPlexSans":"IBM Plex Sans","WixMadeforDisplay":"Wix Madefor Display","Lato":"Lato","NunitoSans":"Nunito Sans","Barlow":"Barlow","SourceSerif4":"Source Serif 4","Outfit":"Outfit"}
faces = []
for stem, fam in names.items():
    for w in ("400", "700"):
        assert os.path.exists(os.path.join(root, 'fonts', f'{stem}-{w}.ttf')), stem
        faces.append(f'@font-face{{font-family:"{fam}";src:url(fonts/{stem}-{w}.ttf) format("truetype");font-weight:{w};font-style:normal;font-display:swap}}')
css = "\n".join(faces) + "\n" + src('app.css')
body = src('body.html')
open(os.path.join(root, 'app.js'), 'w', encoding='utf8').write(src('app.js'))
desc_he = "כתבו את שם החברה שלכם, וקורות החיים שלי יתלבשו בצבעים ובפונט שלה."
head = f'''<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Bar Achdut · CV</title>
<meta name="description" content="{desc_he}">
<meta property="og:type" content="website">
<meta property="og:title" content="Bar Achdut · Senior Software Engineer">
<meta property="og:description" content="{desc_he}">
<meta property="og:image" content="https://barachdut.github.io/cv/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1F2430">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preload" href="fonts/Rubik-400.ttf" as="font" type="font/ttf" crossorigin>
<link rel="preload" href="fonts/Rubik-700.ttf" as="font" type="font/ttf" crossorigin>
<style>
{css}
</style>
</head>
<body>
'''
scripts = '<script src="data.js"></script>\n<script src="vendor/jspdf.umd.min.js" defer></script>\n<script src="app.js"></script>\n'
open(os.path.join(root, 'index.html'), 'w', encoding='utf8').write(head + body + scripts + '</body>\n</html>\n')
# claude.ai preview page: content only (the host adds the document skeleton)
os.makedirs(os.path.join(root, '..', 'preview'), exist_ok=True)
page = f'<title>Bar Achdut CV</title>\n<style>\n{css}\n</style>\n' + body + scripts
open(os.path.join(root, '..', 'preview', 'page.html'), 'w', encoding='utf8').write(page)
print('built', len(head + body), 'bytes')
