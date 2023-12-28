-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "destination_id" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL,
    "title" TEXT,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "uses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
