document.getElementById('getHolidaysButton').addEventListener('click', fetchHolidays);

async function fetchHolidays() {
    const countryCode = document.getElementById('countrySelect').value;
    const year = new Date().getFullYear();

    try {
        const response = await fetch(`/api/v3/PublicHolidays/{Year}/{CountryCode}/`);
        const holidays = await response.json();

        const container = document.getElementById('holidaysContainer');
        container.innerHTML = `
            <h2>National Holidays</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Holiday Name</th>
                        <th>Local Name</th>
                    </tr>
                </thead>
                <tbody>
                    ${holidays.map(holiday => `
                        <tr>
                            <td>${holiday.date}</td>
                            <td>${holiday.name}</td>
                            <td>${holiday.localName}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        document.getElementById('holidaysContainer').innerHTML = `
            <p>Failed to fetch holidays. Please try again later.</p>
        `;
    }
}
const cacheName = 'my-pwa-cache-v1';
const staticAssets = [
  '/',
  '/holiday.html',
  '/style1.css',
  '/script.js'
];

self.addEventListener('install', async () => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
