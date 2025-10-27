CREATE TABLE "modification_boxes" (
	"modification_id" text NOT NULL,
	"gearbox_id" text NOT NULL,
	CONSTRAINT "modification_boxes_modification_id_gearbox_id_pk" PRIMARY KEY("modification_id","gearbox_id")
);
--> statement-breakpoint
ALTER TABLE "modification_boxes" ADD CONSTRAINT "modification_boxes_modification_id_modifications_id_fk" FOREIGN KEY ("modification_id") REFERENCES "public"."modifications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "modification_boxes" ADD CONSTRAINT "modification_boxes_gearbox_id_gearboxes_id_fk" FOREIGN KEY ("gearbox_id") REFERENCES "public"."gearboxes"("id") ON DELETE no action ON UPDATE no action;