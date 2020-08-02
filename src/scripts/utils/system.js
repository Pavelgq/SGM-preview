const readFile = async function readTextFile(url, name) {
    let data;
    let response = await fetch(url);
    data = await response.json();
    return [name] = data;
  }

  export default {
      readFile,
  }