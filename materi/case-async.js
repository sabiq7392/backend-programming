// ========== Callback 
// const persiapan = () => {
//   console.log('Sedang Persiapan....');
// };

// const rebusAir = () => {
//   console.log('Sedang Merebus Air....');
// };

// const masak = () => {
//   console.log('Sedang Memasak....');
//   console.log('Selesai');
// };

// const main = () => {
//   setTimeout(() => {
//     persiapan();
//     setTimeout(() => {
//       rebusAir();
//       setTimeout(() => {
//         masak();
//       }, 7000);
//     }, 5000);
//   }, 3000);
// };

// main();

// const persiapan = () => {
//   console.log('Sedang Persiapan....');
// };


// =========== Promise
// const persiapan = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('Persiapan....');
//     }, 3000);
//   });
// };

// const rebusAir = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('Sedang Merebus Air....');
//     }, 5000);
//   })
// };

// const masak = () => {
//   return new Promise((resolve, reject) => {
//     resolve('Masak.... Seleasi.');
//   }, 7000); 
// };

// const main = () => {
//   persiapan()
//     .then((result) => {
//       console.log(result);
//       return rebusAir();
//     })
//     .then((result) => {
//       console.log(result);
//       return masak();
//     })
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// main();

// ============== Async Await
const persiapan = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Persiapan....');
    }, 3000);
  });
};

const rebusAir = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Sedang Merebus Air....');
    }, 5000);
  });
};

const masak = () => {
  const statusGas = true;
  return new Promise((resolve, reject) => {
    statusGas ? resolve('Masak.... Selesai.') : reject('Gas Habis.');
  }, 7000); 
};

const main = async () => {
  try {
    console.log(await persiapan());
    console.log(await rebusAir());
    console.log(await masak());
  } catch(error) {
    console.log(error);
  }
};

main();
