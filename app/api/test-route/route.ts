export async function GET(request: Request) {
  const currentDate = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York'
  });
  console.log(`Current Date: ${currentDate}`);
  return new Response(JSON.stringify({ message: 'success' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

// export async function POST(request: Request) {
//   const currentDate = new Date().toLocaleString('en-US', {
//     timeZone: 'America/New_York'
//   });
//   console.log(`Current Date: ${currentDate}`);
//   return new Response(JSON.stringify({ message: 'success' }), {
//     status: 200,
//     headers: { 'Content-Type': 'application/json' }
//   });
// }
