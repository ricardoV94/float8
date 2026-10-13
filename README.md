# float8 trainer

An interactive browser app for learning floating-point representation with float8
(E4M3): explore the bits, practice encoding numbers, and try random or timed exercises.

Open `app.html` in a browser, or serve this directory locally:

```sh
python3 -m http.server 8000
```

Visit `http://localhost:8000/`. Offline support is available after the first visit
when served over HTTPS or localhost. The practice counter is stored in your browser.

The GitHub Pages workflow publishes only the app and its assets whenever they
change on `main`. Arithmetic exercises remain unlinked; cancellation is a placeholder.
