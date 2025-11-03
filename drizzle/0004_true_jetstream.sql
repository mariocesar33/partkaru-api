ALTER TABLE "models" DROP CONSTRAINT "models_brand_id_brands_id_fk";
--> statement-breakpoint
ALTER TABLE "models" ALTER COLUMN "brand_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "models" ADD CONSTRAINT "models_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;