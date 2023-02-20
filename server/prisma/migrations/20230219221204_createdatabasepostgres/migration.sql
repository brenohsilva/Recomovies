-- CreateTable
CREATE TABLE "Lists" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "plot" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lists_pkey" PRIMARY KEY ("id")
);
