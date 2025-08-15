const basePath = process.env.BASE_PATH && process.env.BASE_PATH !== "/" ? process.env.BASE_PATH : "";
export default { basePath, assetPrefix: basePath || undefined, images:{ unoptimized:true } };
