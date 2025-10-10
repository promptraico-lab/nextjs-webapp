/*
  Warnings:

  - The values [FREE,PRO,TEAM] on the enum `Plan` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Plan_new" AS ENUM ('MONTHLY', 'YEARLY');
ALTER TABLE "public"."Subscription" ALTER COLUMN "plan" DROP DEFAULT;
ALTER TABLE "public"."Subscription" ALTER COLUMN "plan" TYPE "public"."Plan_new" USING ("plan"::text::"public"."Plan_new");
ALTER TYPE "public"."Plan" RENAME TO "Plan_old";
ALTER TYPE "public"."Plan_new" RENAME TO "Plan";
DROP TYPE "public"."Plan_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Subscription" ALTER COLUMN "plan" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "promptOptimizations" INTEGER NOT NULL DEFAULT 10;
