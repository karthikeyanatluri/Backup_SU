const fs = require('fs');

const baseline = JSON.parse(fs.readFileSync('D:/SU2/oasis-2025-web-main/baseline-report.json', 'utf8'));
const post = JSON.parse(fs.readFileSync('D:/SU2/oasis-2025-web-main/post-audit-report.json', 'utf8'));

function extract(data) {
  return {
    Performance: Math.round((data.categories?.performance?.score ?? 0) * 100),
    Accessibility: Math.round((data.categories?.accessibility?.score ?? 0) * 100),
    'Best Practices': Math.round((data.categories?.['best-practices']?.score ?? 0) * 100),
    SEO: Math.round((data.categories?.seo?.score ?? 0) * 100),
    FCP: data.audits?.['first-contentful-paint']?.displayValue ?? 'N/A',
    LCP: data.audits?.['largest-contentful-paint']?.displayValue ?? 'N/A',
    TBT: data.audits?.['total-blocking-time']?.displayValue ?? 'N/A',
    CLS: data.audits?.['cumulative-layout-shift']?.displayValue ?? 'N/A',
  };
}

console.log('BASELINE:', JSON.stringify(extract(baseline), null, 2));
console.log('POST-OPTIMIZATION:', JSON.stringify(extract(post), null, 2));

