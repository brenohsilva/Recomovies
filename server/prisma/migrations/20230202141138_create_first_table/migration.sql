-- CreateTable
CREATE TABLE "Lists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "plot" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
