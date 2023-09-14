function Test() {
  const array = [];

  return (
    <>
      {array?.map((item) => {
        return (
          <li>{item.text == "red" ? "den her rød" : "den er ikke rød"}</li>
        );
      })}
    </>
  );
}
