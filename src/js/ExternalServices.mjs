
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  async checkout(order) {
    const response = await fetch(
      "https://wdd330-backend-osp8.onrender.com/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Backend error details:", data);
      throw new Error(
        `Checkout failed (${response.status}): ${JSON.stringify(data)}`
      );
    }

    return data;
  }
}
