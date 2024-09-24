import { getCertStatus } from "easy-ocsp";
import https from "https";
import dns from "dns/promises";

export const fetchCertificate = async (domain) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: domain,
      port: 443,
      method: "GET",
      rejectUnauthorized: false,
    };

    const req = https.request(options, (res) => {
      const cert = res.socket.getPeerCertificate(true);

      if (cert && Object.keys(cert).length > 0) {
        resolve(cert);
      } else {
        reject(new Error("No certificate retrieved"));
      }
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
};

export const extractMetadata = (cert) => {
  return {
    subject: cert.subject,
    issuer: cert.issuer,
    validFrom: cert.valid_from,
    validTo: cert.valid_to,
    serialNumber: cert.serialNumber,
    subjectaltname: cert.subjectaltname,
  };
};

export const isCertificateExpired = (cert) => {
  const now = new Date();
  return now > new Date(cert.valid_to);
};

export const isCertificateForDomain = (cert, domain) => {
  const altNames = cert.subjectaltname.split(", ");
  return altNames.some((altName) => {
    const dnsName = altName.replace("DNS:", "").trim();

    if (dnsName === domain) {
      return true;
    }

    // check for wildcard matches
    if (dnsName.startsWith("*.")) {
      const baseDomain = dnsName.substring(2); // remove '*.'

      // check if the domain ends with the base domain
      return (
        domain.endsWith(baseDomain) &&
        domain.split(".").length === baseDomain.split(".").length + 1
      );
    }

    return false;
  });
};

export const isCertificateSelfSigned = (cert) => {
  return cert.subject === cert.issuer;
};

export const isCertificateRevoked = async (cert) => {
  const result = await getCertStatus(cert.raw);

  return result.status === "revoked";
};

const extractCertificateData = (cert) => {
  return {
    subject: cert.subject,
    issuer: cert.issuer,
    validFrom: cert.valid_from,
    validTo: cert.valid_to,
    serialNumber: cert.serialNumber,
  };
};

export const getCertificateChain = (cert) => {
  const chain = [];
  const cache = new Set();

  let currentCert = cert;

  while (currentCert) {
    const serialNumber = currentCert.serialNumber;

    if (cache.has(serialNumber)) {
      // exit the loop if the serial number is repeated
      break;
    }

    cache.add(serialNumber);

    if (currentCert.subject.CN) {
      chain.push(extractCertificateData(currentCert));
    }

    currentCert = currentCert.issuerCertificate; // Move to the next issuer certificate
  }

  return chain;
};

export const getIPAddress = async (domain) => {
  try {
    const addresses = await dns.resolve(domain);

    return addresses[0];
  } catch (error) {
    console.error("Failed to resolve domain:", error);
    return null;
  }
};
