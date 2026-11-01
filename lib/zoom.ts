import "server-only";
import { KJUR } from "jsrsasign";

export function generateZoomToken(
  sessionName: string,
  roleType: number
) {
  const sdkKey = process.env.ZOOM_SDK_KEY;
  const sdkSecret = process.env.ZOOM_SDK_SECRET;

  if (!sdkKey || !sdkSecret) {
    throw new Error("Zoom credentials missing");
  }

  const iat = Math.floor(Date.now() / 1000) - 30;
  const exp = iat + 60 * 60;

  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    app_key: sdkKey,
    tpc: sessionName,
    role_type: roleType,
    version: 1,
    iat,
    exp,
  };

  return KJUR.jws.JWS.sign(
    "HS256",
    JSON.stringify(header),
    JSON.stringify(payload),
    sdkSecret
  );
}