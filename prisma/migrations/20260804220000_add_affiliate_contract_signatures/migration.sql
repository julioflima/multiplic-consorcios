CREATE TABLE "AffiliateContractSignature" (
    "id" TEXT NOT NULL,
    "contractVersion" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "signedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AffiliateContractSignature_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AffiliateContractSignature_email_contractVersion_key" ON "AffiliateContractSignature"("email", "contractVersion");
