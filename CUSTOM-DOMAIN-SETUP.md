# Custom Domain Setup for GitHub Pages

This guide will help you set up a custom domain for your MindPlay app on GitHub Pages.

## Step 1: Purchase a Domain

Buy a domain from a registrar like:
- **Namecheap** (recommended, ~$10-15/year)
- **Cloudflare** (competitive pricing)
- **Google Domains** / **Squarespace**
- **GoDaddy**
- **Porkbun**

Example domains you could get:
- `mindplay.app`
- `playmindfully.com`
- `mindplay.io`
- `yourgames.app`

## Step 2: Update CNAME File

1. Open `public/CNAME` file
2. Replace `yourdomain.com` with your actual domain:
   ```
   mindplay.app
   ```
   or
   ```
   www.mindplay.app
   ```

## Step 3: Configure DNS Settings

Go to your domain registrar's DNS management and add these records:

### For Apex Domain (mindplay.app):

Add these **A Records**:
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

### For WWW Subdomain (www.mindplay.app):

Add this **CNAME Record**:
```
Type: CNAME
Name: www
Value: jaxxat1300.github.io
```

### For Custom Subdomain (games.yourdomain.com):

If you want to use a subdomain like `games.yourdomain.com`:
```
Type: CNAME
Name: games
Value: jaxxat1300.github.io
```

## Step 4: Deploy to GitHub

After updating the CNAME file:

```bash
npm run deploy
```

## Step 5: Configure GitHub Pages

1. Go to: https://github.com/jaxxat1300/Game-1-Productivity-App/settings/pages

2. In the **Custom domain** section, enter your domain:
   - Example: `mindplay.app` or `www.mindplay.app`

3. Click **Save**

4. Wait for DNS check (can take a few minutes to 48 hours)

5. Once verified, check **"Enforce HTTPS"** (recommended for security)

## DNS Propagation

- DNS changes can take anywhere from a few minutes to 48 hours to fully propagate
- You can check DNS propagation at: https://dnschecker.org

## Testing Your Setup

After DNS propagates, your site will be accessible at:
- `https://yourdomain.com` (if using apex domain)
- `https://www.yourdomain.com` (if using www subdomain)

## Common Issues

### "Domain is not yet verified"
- Wait a few minutes and try again
- Check your DNS settings are correct
- Make sure DNS has propagated

### "CNAME already in use"
- The domain is already connected to another GitHub Pages site
- You need to remove it from the other site first

### "Improperly configured"
- Double-check your DNS A records or CNAME record
- Make sure you're using the correct GitHub Pages IPs

## Example DNS Configuration (Namecheap)

For Namecheap specifically:

1. Log into Namecheap
2. Go to Domain List → Manage
3. Click "Advanced DNS"
4. Add the A records and CNAME record as shown above
5. TTL can be set to "Automatic" or "1 min"

## Security: HTTPS

Once your custom domain is working:
1. Go to GitHub Pages settings
2. Check **"Enforce HTTPS"**
3. GitHub will automatically provision an SSL certificate

This makes your site secure with `https://`

## Cost

- Domain registration: ~$10-20/year (depending on TLD like .com, .app, .io)
- GitHub Pages hosting: FREE
- SSL Certificate: FREE (automatic from GitHub)

## Need Help?

- GitHub Pages Documentation: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- DNS Checker: https://dnschecker.org
- Namecheap DNS Guide: https://www.namecheap.com/support/knowledgebase/article.aspx/319/2237/how-can-i-set-up-an-a-address-record-for-my-domain/

---

## Quick Reference

**Your GitHub Pages default URL:**
`https://jaxxat1300.github.io/Game-1-Productivity-App/`

**Your custom domain (after setup):**
`https://yourdomain.com/`

**Repository:**
`https://github.com/jaxxat1300/Game-1-Productivity-App`

