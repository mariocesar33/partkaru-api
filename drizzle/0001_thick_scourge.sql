CREATE TABLE "modifications" (
	"id" text PRIMARY KEY NOT NULL,
	"model_id" text,
	"engine_id" text,
	"car_body_id" text,
	"propulsion_id" text,
	"version_name" text NOT NULL,
	"version_code" text,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp
);
--> statement-breakpoint
ALTER TABLE "modifications" ADD CONSTRAINT "modifications_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "modifications" ADD CONSTRAINT "modifications_engine_id_engines_id_fk" FOREIGN KEY ("engine_id") REFERENCES "public"."engines"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "modifications" ADD CONSTRAINT "modifications_car_body_id_car_bodies_id_fk" FOREIGN KEY ("car_body_id") REFERENCES "public"."car_bodies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "modifications" ADD CONSTRAINT "modifications_propulsion_id_propulsions_id_fk" FOREIGN KEY ("propulsion_id") REFERENCES "public"."propulsions"("id") ON DELETE set null ON UPDATE no action;