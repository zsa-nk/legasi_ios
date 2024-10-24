/**
  * 
  * @param {*} a : {x: number, y: number} 
  * @param {*} b : {x: number, y: number}
  * @returns number
  */
export const euclideanDistance = (a, b) => {
  let c, d, e, f;
  c = a.x - b.x;
  d = a.y - b.y;
  e = Math.pow(c, 2);
  f = Math.pow(d, 2);
  return Math.sqrt(e + f);
}

export const compareArrayOfContour = async (array, contour) => {
  let matches = 0;
  let total = 0;
  const tolerance = 40;
  if (array.length > 0) {
    for await (const [index, element] of array.entries()) {
      Object.keys(contour).forEach(key => {
        if (typeof element[key] == 'object') {
          total += 1;
          let ed = euclideanDistance(element[key], contour[key])
          if (ed <= tolerance) {
            matches += 1;
          }
        }
      })
    }
  }
  return total > 0 ? ((matches / total) * 100) : 0;
}