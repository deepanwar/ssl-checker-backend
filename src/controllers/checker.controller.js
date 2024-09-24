import {
  extractMetadata,
  fetchCertificate,
  getCertificateChain,
  getIPAddress,
  isCertificateExpired,
  isCertificateForDomain,
  isCertificateRevoked,
  isCertificateSelfSigned,
} from "../helpers/checker.helper.js";

export const checkSSLCertificate = async (req, res) => {
  const { domain } = req.params;

  try {
    const cert = await fetchCertificate(domain);

    if (!cert) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    const metadata = extractMetadata(cert);
    const isExpired = isCertificateExpired(cert);
    const isValidForDomain = isCertificateForDomain(cert, domain);
    const isRevoked = await isCertificateRevoked(cert);
    const isSelfSigned = isCertificateSelfSigned(cert);
    const certificateChain = getCertificateChain(cert);
    const ipAddress = await getIPAddress(domain);

    return res.json({
      metadata,
      domain,
      ipAddress,
      isExpired,
      isValidForDomain,
      isRevoked,
      isSelfSigned,
      certificateChain,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch SSL certificate" });
  }
};
