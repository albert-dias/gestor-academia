/*
  Warnings:

  - Added the required column `company_id` to the `uses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "uses" ADD COLUMN     "company_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "uses" ADD CONSTRAINT "uses_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
