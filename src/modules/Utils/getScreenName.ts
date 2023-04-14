export default function getScreenPath(baseName: string) {
  return (slash = false) => {
    if(slash) return '/' + baseName;
    else return baseName;
  }
}