// Sample crop dataset (representative rows from Crop_recommendation.csv)
const cropData = [
  // rice
  { N: 90, P: 42, K: 43, temperature: 20.88, humidity: 82.00, ph: 6.50, rainfall: 202.94, label: "rice" },
  { N: 85, P: 58, K: 41, temperature: 21.77, humidity: 80.32, ph: 7.04, rainfall: 226.66, label: "rice" },
  { N: 60, P: 55, K: 44, temperature: 23.00, humidity: 82.32, ph: 7.84, rainfall: 263.96, label: "rice" },
  { N: 74, P: 35, K: 40, temperature: 26.49, humidity: 80.16, ph: 6.98, rainfall: 242.86, label: "rice" },
  { N: 78, P: 42, K: 42, temperature: 20.13, humidity: 81.60, ph: 7.63, rainfall: 262.72, label: "rice" },
  // maize
  { N: 77, P: 52, K: 17, temperature: 24.85, humidity: 65.72, ph: 6.74, rainfall: 67.80, label: "maize" },
  { N: 97, P: 52, K: 20, temperature: 25.11, humidity: 59.52, ph: 5.90, rainfall: 82.52, label: "maize" },
  { N: 105,P: 58, K: 19, temperature: 23.08, humidity: 63.84, ph: 7.03, rainfall: 74.19, label: "maize" },
  // chickpea
  { N: 0,  P: 67, K: 30, temperature: 17.15, humidity: 16.67, ph: 7.17, rainfall: 98.54, label: "chickpea" },
  { N: 1,  P: 67, K: 31, temperature: 17.63, humidity: 16.73, ph: 6.77, rainfall: 161.88, label: "chickpea" },
  { N: 15, P: 68, K: 35, temperature: 18.02, humidity: 18.99, ph: 7.42, rainfall: 89.87, label: "chickpea" },
  // kidneybeans
  { N: 20, P: 67, K: 20, temperature: 19.71, humidity: 21.60, ph: 5.80, rainfall: 105.68, label: "kidneybeans" },
  { N: 14, P: 59, K: 20, temperature: 19.21, humidity: 22.30, ph: 6.18, rainfall: 67.21, label: "kidneybeans" },
  { N: 14, P: 58, K: 19, temperature: 21.16, humidity: 22.73, ph: 6.45, rainfall: 72.92, label: "kidneybeans" },
  // pigeonpeas
  { N: 20, P: 69, K: 20, temperature: 26.18, humidity: 59.18, ph: 5.71, rainfall: 149.46, label: "pigeonpeas" },
  { N: 21, P: 67, K: 19, temperature: 23.75, humidity: 66.61, ph: 5.84, rainfall: 111.42, label: "pigeonpeas" },
  // mothbeans
  { N: 21, P: 21, K: 21, temperature: 27.93, humidity: 53.05, ph: 6.63, rainfall: 53.28, label: "mothbeans" },
  { N: 22, P: 22, K: 21, temperature: 29.93, humidity: 47.34, ph: 6.51, rainfall: 48.16, label: "mothbeans" },
  // mungbean
  { N: 21, P: 47, K: 45, temperature: 28.28, humidity: 85.74, ph: 6.76, rainfall: 48.44, label: "mungbean" },
  { N: 22, P: 48, K: 44, temperature: 27.94, humidity: 85.56, ph: 6.82, rainfall: 41.42, label: "mungbean" },
  // blackgram
  { N: 40, P: 67, K: 19, temperature: 29.94, humidity: 65.93, ph: 6.99, rainfall: 68.11, label: "blackgram" },
  { N: 38, P: 67, K: 22, temperature: 28.37, humidity: 68.27, ph: 5.65, rainfall: 63.30, label: "blackgram" },
  // lentil
  { N: 19, P: 67, K: 19, temperature: 18.95, humidity: 64.80, ph: 6.54, rainfall: 50.47, label: "lentil" },
  { N: 19, P: 66, K: 20, temperature: 20.63, humidity: 68.28, ph: 6.85, rainfall: 64.00, label: "lentil" },
  // watermelon
  { N: 99, P: 17, K: 50, temperature: 24.69, humidity: 85.04, ph: 6.45, rainfall: 40.09, label: "watermelon" },
  { N: 100,P: 17, K: 50, temperature: 24.16, humidity: 85.33, ph: 6.50, rainfall: 45.99, label: "watermelon" },
  // muskmelon
  { N: 100,P: 17, K: 50, temperature: 28.43, humidity: 92.34, ph: 6.39, rainfall: 24.89, label: "muskmelon" },
  { N: 100,P: 17, K: 50, temperature: 27.41, humidity: 90.48, ph: 6.36, rainfall: 26.99, label: "muskmelon" },
  // apple
  { N: 21, P: 136,K: 199, temperature: 21.83, humidity: 92.33, ph: 5.94, rainfall: 112.86, label: "apple" },
  { N: 20, P: 134,K: 198, temperature: 22.63, humidity: 91.85, ph: 5.74, rainfall: 113.43, label: "apple" },
  // grapes
  { N: 20, P: 125,K: 199, temperature: 8.62, humidity: 81.42, ph: 6.01, rainfall: 69.47, label: "grapes" },
  { N: 20, P: 124,K: 200, temperature: 9.35, humidity: 82.87, ph: 6.07, rainfall: 63.53, label: "grapes" },
  // orange
  { N: 20, P: 10, K: 10, temperature: 22.77, humidity: 92.24, ph: 6.57, rainfall: 110.34, label: "orange" },
  { N: 19, P: 10, K: 10, temperature: 22.79, humidity: 91.53, ph: 7.07, rainfall: 125.62, label: "orange" },
  // papaya
  { N: 50, P: 59, K: 36, temperature: 33.86, humidity: 92.00, ph: 6.80, rainfall: 145.72, label: "papaya" },
  { N: 55, P: 59, K: 35, temperature: 34.01, humidity: 94.82, ph: 6.05, rainfall: 156.29, label: "papaya" },
  // coconut
  { N: 23, P: 16, K: 30, temperature: 24.68, humidity: 94.84, ph: 6.00, rainfall: 141.00, label: "coconut" },
  { N: 21, P: 17, K: 31, temperature: 24.49, humidity: 92.27, ph: 5.87, rainfall: 156.17, label: "coconut" },
  // cotton
  { N: 138,P: 39, K: 46, temperature: 24.45, humidity: 80.26, ph: 6.88, rainfall: 87.39, label: "cotton" },
  { N: 119,P: 43, K: 47, temperature: 25.65, humidity: 74.61, ph: 7.32, rainfall: 113.87, label: "cotton" },
  // jute
  { N: 78, P: 46, K: 29, temperature: 25.00, humidity: 80.27, ph: 6.52, rainfall: 174.46, label: "jute" },
  { N: 83, P: 43, K: 30, temperature: 24.27, humidity: 73.47, ph: 6.12, rainfall: 157.09, label: "jute" },
  // coffee
  { N: 109,P: 30, K: 30, temperature: 26.11, humidity: 58.65, ph: 6.24, rainfall: 155.31, label: "coffee" },
  { N: 100,P: 27, K: 30, temperature: 22.32, humidity: 57.19, ph: 6.82, rainfall: 134.42, label: "coffee" },
  // banana
  { N: 100,P: 82, K: 50, temperature: 27.38, humidity: 80.77, ph: 5.98, rainfall: 105.92, label: "banana" },
  { N: 101,P: 83, K: 49, temperature: 25.17, humidity: 81.76, ph: 6.01, rainfall: 111.18, label: "banana" },
  // mango
  { N: 20, P: 27, K: 30, temperature: 30.73, humidity: 50.31, ph: 5.77, rainfall: 95.00, label: "mango" },
  { N: 20, P: 28, K: 30, temperature: 31.66, humidity: 52.32, ph: 6.47, rainfall: 103.82, label: "mango" },
  // pomegranate
  { N: 18, P: 18, K: 42, temperature: 21.77, humidity: 90.12, ph: 6.41, rainfall: 107.52, label: "pomegranate" },
  { N: 19, P: 19, K: 43, temperature: 22.89, humidity: 91.87, ph: 6.00, rainfall: 117.09, label: "pomegranate" },
];

// Expand dataset by generating more realistic samples per crop
const expandedData = [];
const cropProfiles = {
  rice:        { N:[60,110],P:[30,60],K:[30,55],temp:[19,27],hum:[75,87],ph:[5.5,7.5],rain:[175,310] },
  maize:       { N:[70,120],P:[45,65],K:[15,25],temp:[20,28],hum:[55,75],ph:[5.5,7.5],rain:[55,100] },
  chickpea:    { N:[0,20],P:[60,80],K:[25,45],temp:[15,22],hum:[14,22],ph:[6.0,8.0],rain:[80,175] },
  kidneybeans: { N:[10,24],P:[55,70],K:[15,25],temp:[17,23],hum:[18,28],ph:[5.5,7.5],rain:[60,120] },
  pigeonpeas:  { N:[18,25],P:[62,78],K:[15,23],temp:[22,30],hum:[55,70],ph:[5.0,7.0],rain:[100,175] },
  mothbeans:   { N:[18,26],P:[18,26],K:[18,26],temp:[25,33],hum:[45,60],ph:[6.0,8.0],rain:[40,70] },
  mungbean:    { N:[18,26],P:[42,55],K:[40,50],temp:[25,32],hum:[80,92],ph:[6.0,8.5],rain:[35,55] },
  blackgram:   { N:[30,50],P:[60,75],K:[15,27],temp:[26,34],hum:[60,75],ph:[5.5,7.5],rain:[55,80] },
  lentil:      { N:[15,25],P:[62,75],K:[15,25],temp:[17,24],hum:[60,75],ph:[6.0,8.0],rain:[40,75] },
  watermelon:  { N:[90,110],P:[13,22],K:[45,55],temp:[22,29],hum:[82,92],ph:[5.5,7.5],rain:[35,55] },
  muskmelon:   { N:[90,110],P:[13,22],K:[45,55],temp:[25,33],hum:[88,97],ph:[6.0,7.5],rain:[20,35] },
  apple:       { N:[18,25],P:[125,145],K:[192,205],temp:[19,25],hum:[88,97],ph:[5.5,7.0],rain:[100,135] },
  grapes:      { N:[18,23],P:[120,135],K:[195,205],temp:[7,14],hum:[78,88],ph:[5.5,7.0],rain:[55,80] },
  orange:      { N:[16,23],P:[8,13],K:[8,13],temp:[20,27],hum:[88,97],ph:[6.0,8.0],rain:[100,135] },
  papaya:      { N:[42,58],P:[55,65],K:[30,42],temp:[31,38],hum:[88,97],ph:[5.5,7.5],rain:[135,175] },
  coconut:     { N:[18,26],P:[13,22],K:[26,36],temp:[22,28],hum:[90,97],ph:[5.0,7.0],rain:[130,175] },
  cotton:      { N:[110,155],P:[35,48],K:[40,52],temp:[22,28],hum:[72,85],ph:[6.0,8.0],rain:[80,125] },
  jute:        { N:[65,95],P:[38,52],K:[24,36],temp:[22,28],hum:[70,85],ph:[5.5,7.5],rain:[150,195] },
  coffee:      { N:[95,125],P:[24,35],K:[24,35],temp:[20,28],hum:[54,70],ph:[5.5,7.0],rain:[125,175] },
  banana:      { N:[90,115],P:[75,92],K:[44,56],temp:[23,30],hum:[75,90],ph:[5.5,7.5],rain:[95,130] },
  mango:       { N:[18,24],P:[22,34],K:[26,36],temp:[28,35],hum:[45,58],ph:[5.0,7.0],rain:[85,115] },
  pomegranate: { N:[15,22],P:[15,22],K:[38,48],temp:[20,27],hum:[88,95],ph:[5.5,7.5],rain:[100,130] },
};

function rand(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

// Generate 100 samples per crop
Object.entries(cropProfiles).forEach(([crop, r]) => {
  for (let i = 0; i < 100; i++) {
    expandedData.push({
      N: rand(r.N[0], r.N[1]),
      P: rand(r.P[0], r.P[1]),
      K: rand(r.K[0], r.K[1]),
      temperature: rand(r.temp[0], r.temp[1]),
      humidity: rand(r.hum[0], r.hum[1]),
      ph: rand(r.ph[0], r.ph[1]),
      rainfall: rand(r.rain[0], r.rain[1]),
      label: crop,
    });
  }
});

module.exports = { cropData, expandedData, cropProfiles };
