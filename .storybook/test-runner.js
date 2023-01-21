module.exports = {
  async postRender(page, context) {
    const elementHandler = await page.$("#storybook-root");
    const innerHTML = await elementHandler.innerHTML();
    expect(innerHTML).toMatchSnapshot();
  },
};
