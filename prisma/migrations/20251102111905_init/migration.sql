/*
  Warnings:

  - You are about to drop the column `bloodType` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `Parent` table. All the data in the column will be lost.
  - Added the required column `bloodType` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodType` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "bloodType",
DROP COLUMN "img";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "bloodType" TEXT NOT NULL,
ADD COLUMN     "gender" "UserGender" NOT NULL,
ADD COLUMN     "img" TEXT;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "bloodType" TEXT NOT NULL,
ADD COLUMN     "gender" "UserGender" NOT NULL,
ADD COLUMN     "img" TEXT;
