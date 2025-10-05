# Publishing Guide

This guide covers how to publish the `react-twitch-live-embed` package to npm.

## Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com/signup) if you don't have one
2. **Login**: Run `npm login` in your terminal
3. **Verification**: Verify you're logged in with `npm whoami`

## Pre-Publishing Checklist

Before publishing, ensure you've completed:

- [ ] Update `package.json` with your author information
- [ ] Update `package.json` with repository URL (if using GitHub)
- [ ] Update `LICENSE` with your name/organization
- [ ] Update `README.md` with correct links
- [ ] Test the build: `npm run build`
- [ ] Test in Storybook: `npm run storybook`
- [ ] Verify package contents: `npm pack --dry-run`
- [ ] Review CHANGELOG.md

## Update Package Information

### 1. Author Information

Edit `package.json`:

```json
"author": "Your Name <your.email@example.com>",
```

Or if using an organization:

```json
"author": {
  "name": "Your Name",
  "email": "your.email@example.com",
  "url": "https://yourwebsite.com"
},
```

### 2. Repository Information

If you've created a GitHub repository:

```json
"repository": {
  "type": "git",
  "url": "git+https://github.com/yourusername/react-twitch-live-embed.git"
},
"bugs": {
  "url": "https://github.com/yourusername/react-twitch-live-embed/issues"
},
"homepage": "https://github.com/yourusername/react-twitch-live-embed#readme",
```

### 3. Update README Links

Replace placeholder links in `README.md`:
- GitHub repository URL
- NPM package URL  
- Issues URL

## Publishing Steps

### First-Time Publication

1. **Login to NPM**:
   ```bash
   npm login
   ```

2. **Verify Package Name Availability**:
   ```bash
   npm search react-twitch-live-embed
   ```
   
   If the name is taken, update `package.json` with a different name.

3. **Dry Run** (verify what will be published):
   ```bash
   npm pack --dry-run
   ```

4. **Publish**:
   ```bash
   npm publish
   ```

   Or if using a scoped package:
   ```bash
   npm publish --access public
   ```

### Subsequent Releases

For version updates:

1. **Update Version**:
   ```bash
   npm version patch  # For bug fixes (1.0.0 -> 1.0.1)
   npm version minor  # For new features (1.0.0 -> 1.1.0)
   npm version major  # For breaking changes (1.0.0 -> 2.0.0)
   ```

2. **Update CHANGELOG.md**:
   Add details about what changed in this version.

3. **Commit Changes**:
   ```bash
   git add .
   git commit -m "chore: release v1.x.x"
   git push
   ```

4. **Publish**:
   ```bash
   npm publish
   ```

5. **Tag Release** (if using Git):
   ```bash
   git tag v1.x.x
   git push --tags
   ```

## Scoped Package (Optional)

If you want to publish under your username/organization:

1. Change the package name in `package.json`:
   ```json
   "name": "@yourusername/react-twitch-live-embed"
   ```

2. Publish as public:
   ```bash
   npm publish --access public
   ```

## Testing the Published Package

After publishing, test the package:

1. **Create a test project**:
   ```bash
   npx create-react-app test-embed --template typescript
   cd test-embed
   ```

2. **Install your package**:
   ```bash
   npm install react-twitch-live-embed
   ```

3. **Use it**:
   ```tsx
   // src/App.tsx
   import { TwitchLive } from 'react-twitch-live-embed';

   function App() {
     return (
       <div className="App">
         <TwitchLive channel="monstercat" width={800} height={450} />
       </div>
     );
   }

   export default App;
   ```

4. **Run the app**:
   ```bash
   npm start
   ```

## NPM Package Settings

After publishing, configure your package on npmjs.com:

1. Go to https://www.npmjs.com/package/react-twitch-live-embed
2. Add a README (automatically from your repo)
3. Add tags/keywords for discoverability
4. Link to GitHub repository
5. Add collaborators if needed

## Useful Commands

```bash
# Check what will be included in the package
npm pack --dry-run

# View package info
npm view react-twitch-live-embed

# Check outdated dependencies
npm outdated

# Update dependencies
npm update

# Deprecate a version
npm deprecate react-twitch-live-embed@1.0.0 "Use version 1.0.1 instead"

# Unpublish (within 72 hours only)
npm unpublish react-twitch-live-embed@1.0.0
```

## Best Practices

1. **Semantic Versioning**: Follow semver strictly
2. **Changelog**: Always update CHANGELOG.md
3. **Testing**: Test thoroughly before publishing
4. **Git Tags**: Tag releases in Git for traceability
5. **Documentation**: Keep README up-to-date
6. **CI/CD**: Consider setting up automated publishing with GitHub Actions

## Troubleshooting

### "Package name already exists"

Choose a different name or use a scoped package (`@username/package-name`).

### "You must be logged in to publish"

Run `npm login` first.

### "402 Payment Required"

This usually means you're trying to publish a scoped private package on the free tier. Use `--access public`.

### Build Fails Before Publishing

The `prepublishOnly` script runs `npm run build` automatically. Fix any build errors before publishing.

## GitHub Actions (Optional)

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add your NPM token to GitHub secrets.

## Resources

- [NPM Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [NPM Package Best Practices](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

---

Good luck with your package! 🚀
