async function fetchNews() {
  const stockName = document.getElementById('stockName').value.trim();
  const loader = document.getElementById('loader');
  const newsContainer = document.getElementById('newsContainer');

  if (!stockName) {
    alert("Please enter a stock name.");
    return;
  }

  loader.style.display = 'block';
  newsContainer.innerHTML = '';

  try {
    const response = await fetch(`http://18.234.85.94:5000/get-news?query=${stockName}`);
    const data = await response.json();

    loader.style.display = 'none';

    if (!data.headlines || data.headlines.length === 0) {
      newsContainer.innerHTML = "<p>No headlines found.</p>";
      return;
    }

    const list = document.createElement('ol'); // ordered list
    data.headlines.forEach((headline, index) => {
      const li = document.createElement('li');
      li.textContent = headline;
      list.appendChild(li);
    });

    newsContainer.appendChild(list);

  } catch (error) {
    loader.style.display = 'none';
    newsContainer.innerHTML = "<p>Error fetching headlines. Try again later.</p>";
    console.error(error);
  }
}
