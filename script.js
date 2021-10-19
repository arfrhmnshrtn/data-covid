const searchBar = document.querySelector('.input-kywoard-provinsi');
const provinsiList = document.querySelector('.container-cards');
let hpProvinsi = [];

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  const filterProvinsi = hpProvinsi.filter((provinsi) => {
      return (
          provinsi.attributes.Provinsi.toLowerCase().includes(searchString)
      );
  });
  updateUI(filterProvinsi);
});

const loadData = async () => {
    try {
        const res = await fetch('https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json')
        .then(response => response.json())
        .then(response => response.features);
        hpProvinsi = await res;
        updateUI(hpProvinsi);
        tampilkanDataIndonesia(hpProvinsi)
    } catch (error) {
        console.error(error);
    }
};

const updateUI = (characters) => {
  const formatNumber  = new Intl.NumberFormat();
  let cards = '';
  characters.forEach((el) => {
           cards += `<div class="col-md text-light p-3 cards-provinsi ${el.attributes.Provinsi}" style="background-color: #101010;">
                      <h4 class="text-center text-uppercase fw-bold">${el.attributes.Provinsi}</h4>
                      <div class="data d-flex justify-content-center">
                        <div class="total text-center p-3">
                          <p>Terkonfirmasi</p>
                          <h4 class="text-danger fw-bold">${formatNumber.format(el.attributes.Kasus_Posi)}</h4>
                        </div>
                        <div class="total text-center p-3">
                          <p>Sembuh</p>
                          <h4 class="text-success fw-bold">${formatNumber.format(el.attributes.Kasus_Semb)}</h4>
                        </div>
                        <div class="total text-center p-3">
                          <p>Meninggal</p>
                          <h4 class="text-warning fw-bold">${formatNumber.format(el.attributes.Kasus_Meni)}</h4>
                        </div>
                      </div>
                    </div>`;
  })
  provinsiList.innerHTML = cards;
};

loadData();


  // function update data indonesia
  function tampilkanDataIndonesia(response) {
    let totalSeluruhIndo = 0;
    let totalSembuhIndo = 0;
    let totalMeninggalIndo = 0;
    // console.log(response)
    response.forEach(c => {
      totalSembuhIndo += c.attributes.Kasus_Semb;
      totalMeninggalIndo += c.attributes.Kasus_Meni;
      totalSeluruhIndo += c.attributes.Kasus_Posi;
    });

    const formatNumber  = new Intl.NumberFormat(); //format number
    const totalKasus = document.querySelector('.total-kasus');
    const kasusSembuh = document.querySelector('.kasus-sembuh');
    const kasusMeninggal = document.querySelector('.kasus-meniggal');
    
    totalKasus.innerHTML = formatNumber.format(totalSeluruhIndo);
    kasusSembuh.innerHTML = formatNumber.format(totalSembuhIndo);
    kasusMeninggal.innerHTML = formatNumber.format(totalMeninggalIndo);
  }


  // navbar sticky
  const header = document.querySelector('.header');
  window.addEventListener("scroll", function() {
    if(this.scrollY > 50){
        header.classList.add("sticky");
    }else{
        header.classList.remove("sticky");
    }
  });
    