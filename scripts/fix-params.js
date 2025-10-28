const fs = require('fs');
const path = require('path');

const files = [
  'src/app/api/events/[id]/rsvp/route.ts',
  'src/app/api/posts/[id]/route.ts',
  'src/app/api/posts/[id]/vote/route.ts',
  'src/app/api/posts/[id]/comments/route.ts'
];

files.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping ${filePath} - file not found`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;

  // Replace params type declarations
  content = content.replace(
    /\{ params \}: \{ params: \{ id: string \} \}/g,
    '{ params }: { params: Promise<{ id: string }> }'
  );

  // Add await params at the start of each function
  content = content.replace(
    /export async function (GET|POST|PUT|DELETE)\([^)]+\) {[\r\n]+  try {/g,
    (match) => {
      if (modified) return match;
      modified = true;
      return match.replace('try {', 'try {\n    const { id } = await params;');
    }
  );

  // Replace params.id with id
  content = content.replace(/params\.id/g, 'id');

  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed ${filePath}`);
  }
});

console.log('Done!');

