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
CREATE TABLE "engines" (
	"id" text PRIMARY KEY NOT NULL,
	"fuel_id" text,
	"comb_systems_id" text,
	"engine_code" text NOT NULL,
	"power_kw" integer,
	"power_cv" integer,
	"displacement_cc" integer NOT NULL,
	"number_of_cylinders" integer NOT NULL,
	"valves_per_cylinder" integer NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	CONSTRAINT "engines_engine_code_unique" UNIQUE("engine_code")
);
--> statement-breakpoint
CREATE TABLE "fuels" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT "fuels_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "comb_systems" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT "comb_systems_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "car_bodies" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT "car_bodies_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "propulsions" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT "propulsions_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "gearboxes" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"transmission_type" text NOT NULL,
	"speed_number" integer NOT NULL,
	"manufacturer" text,
	CONSTRAINT "gearboxes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "models" ADD CONSTRAINT "models_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "engines" ADD CONSTRAINT "engines_fuel_id_fuels_id_fk" FOREIGN KEY ("fuel_id") REFERENCES "public"."fuels"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "engines" ADD CONSTRAINT "engines_comb_systems_id_comb_systems_id_fk" FOREIGN KEY ("comb_systems_id") REFERENCES "public"."comb_systems"("id") ON DELETE set null ON UPDATE no action;