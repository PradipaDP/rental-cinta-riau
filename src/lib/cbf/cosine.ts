export function hitungCosineSimilarity(vektorA: number[], vektorB: number[]): number {
  if (vektorA.length !== vektorB.length || vektorA.length === 0) return 0;

  let dotProduct = 0;
  let normaA_sq = 0;
  let normaB_sq = 0;

  for (let i = 0; i < vektorA.length; i++) {
    dotProduct += vektorA[i] * vektorB[i];
    normaA_sq += vektorA[i] * vektorA[i];
    normaB_sq += vektorB[i] * vektorB[i];
  }

  // Aman terhadap vektor nol (jika salah satu norma bernilai 0)
  if (normaA_sq === 0 || normaB_sq === 0) {
    return 0;
  }

  const similarity = dotProduct / (Math.sqrt(normaA_sq) * Math.sqrt(normaB_sq));
  
  // Bulatkan atau pastikan dalam rentang [0, 1]
  return Math.max(0, Math.min(1, similarity));
}