// outputs random 512 bit key to use as JWT_SECRET
import crypto from "node:crypto";

// "hmac" keys are for HS algorithms. Lenght is in bits
crypto.generateKey("hmac", { length: 512 }, (err, key) => {
  if (err) throw err;
  console.log(key.export().toString("hex"));
});
