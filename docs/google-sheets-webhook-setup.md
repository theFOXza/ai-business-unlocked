# Google Sheets webhook setup for quiz leads

Use this to capture every quiz submission in a Google Sheet via a Google Apps Script web app.

## 1) Create the Google Sheet

Create a new Google Sheet and add this header row in row 1, in this exact order:

```text
Timestamp | First Name | Email | Business Name | Score | Max Score | Grade | Estimated Hours Min | Estimated Hours Max | Est Monthly Impact Min | Est Monthly Impact Max | Top Area 1 | Top Area 2 | Top Area 3 | Business Type | Team Size | AI Familiarity | UTM Source | UTM Campaign | UTM Medium | Snapshot URL
```

Tip: after pasting the headers, freeze row 1.

## 2) Open Apps Script

In the Google Sheet:

1. Click **Extensions**
2. Click **Apps Script**

This opens the script editor for the sheet.

## 3) Paste this script

Replace any default code with this:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      data.timestamp,
      data.firstName,
      data.email,
      data.businessName,
      data.score,
      data.maxScore,
      data.grade,
      data.estimatedHoursMin,
      data.estimatedHoursMax,
      data.estMonthlyImpactMin,
      data.estMonthlyImpactMax,
      data.topArea1,
      data.topArea2,
      data.topArea3,
      data.businessType,
      data.teamSize,
      data.aiFamiliarity,
      data.utmSource,
      data.utmCampaign,
      data.utmMedium,
      data.snapshotUrl,
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 4) Deploy as a Web App

1. Click **Deploy**
2. Click **New deployment**
3. In the type selector, choose **Web app**
4. Set **Execute as** to **Me**
5. Set **Who has access** to **Anyone**
6. Click **Deploy**
7. Approve Google permissions if prompted

After deployment, Google will give you a URL like:

```text
https://script.google.com/macros/s/AKfycb.../exec
```

Copy that URL.

## 5) Add the webhook URL to Vercel

In Vercel, add this environment variable:

- **Name:** `GOOGLE_SHEETS_WEBHOOK_URL`
- **Value:** the Apps Script web app URL from the previous step

Add it to the Production environment, then redeploy if needed.

## 6) What the app sends

The quiz submit endpoint posts JSON with these fields, in the same order as the sheet columns:

- `timestamp`
- `firstName`
- `email`
- `businessName`
- `score`
- `maxScore`
- `grade`
- `estimatedHoursMin`
- `estimatedHoursMax`
- `estMonthlyImpactMin`
- `estMonthlyImpactMax`
- `topArea1`
- `topArea2`
- `topArea3`
- `businessType`
- `teamSize`
- `aiFamiliarity`
- `utmSource`
- `utmCampaign`
- `utmMedium`
- `snapshotUrl`

## 7) Quick test

After the env var is added, submit a quiz entry on the live site and confirm a new row appears in the sheet.

If rows do not appear:

- confirm the deployment is the latest one
- confirm the env var name is exactly `GOOGLE_SHEETS_WEBHOOK_URL`
- confirm the Apps Script access is set to **Anyone**
- check the Vercel function logs for `Sheets webhook error`
