export const style = {
  root: {
    margin: "0 auto",
    backgroundColor: "bisque",
    width: "40%",
    padding: "10%"
  },

  center: {
    textAlign: "center"
  },

  ul: {
    margin: "40px",
    fontSize: "large",
    textAlign: "left",
    listStyle: "none"
  },

  cross(bool) {
    if (bool) return { textDecoration: "line-through" };
    else return { textDecoration: "none" };
  },

  bgColor(clickedElement, activatedElement) {
    if (clickedElement === activatedElement)
      return {
        backgroundColor: "green",
        border: "1px solid black",
        color: "#f7f7f7"
      };
    else
      return {
        backgroundColor: "rgb(239, 239, 239)",
        border: "1px solid black",
        color: "black"
      };
  },

  display(mode) {
    if (mode === "none") return { display: "none" };
  },

  input: {
    border: "none",
    border: "1px solid black",
    height: "34px",
    fontSize: "medium"
  },

  textinput: {
    textAlign: "center",
    display: "block",
    width: "300px",
    height: "50px",
    margin: "0 auto",
    fontSize: "medium"
  },

  flex: {
    display: "flex"
  },

  footer: {
    display: "flex",
    marginTop: "5%",
    justifyContent: "space-between",
    backgroundColor: "burlywood"
  }
};
