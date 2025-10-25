CREATE TABLE "brands" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"popular" boolean DEFAULT false NOT NULL,
	"country_origin" varchar(50),
	CONSTRAINT "brands_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "models" (
	"id" text PRIMARY KEY NOT NULL,
	"brand_id" text,
	"name" varchar(50) NOT NULL,
	"generation" text,
	CONSTRAINT "models_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "models" ADD CONSTRAINT "models_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;