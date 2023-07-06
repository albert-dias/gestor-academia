/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `uses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "uses_email_key" ON "uses"("email");
