const download = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const status = false;
      status ? resolve('Download Berhasil') : reject('Download Gagal');
    }, 3000);
  });
}

download()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
