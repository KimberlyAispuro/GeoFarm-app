set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "geoFarm" cascade;

create schema "geoFarm";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"fullName" TEXT NOT NULL,
	"phoneNumber" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"image" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "prospects" (
	"prospectId" serial NOT NULL,
	"address" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"phoneNumber" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"interestInSelling" BOOLEAN NOT NULL,
	"neighborhoodComplaints" TEXT NOT NULL,
	"notes" TEXT NOT NULL,
	"prospectStatus" VARCHAR(255) NOT NULL,
	"farmId" integer NOT NULL,
	"viewPipelineId" integer NOT NULL,
	CONSTRAINT "prospects_pk" PRIMARY KEY ("prospectId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "viewPipeline" (
	"viewPipelineId" serial NOT NULL,
	"farmId" integer NOT NULL,
	CONSTRAINT "viewPipeline_pk" PRIMARY KEY ("viewPipelineId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "farms" (
	"farmId" serial NOT NULL,
	"farmName" TEXT NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "farms_pk" PRIMARY KEY ("farmId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "viewMap" (
	"mapId" serial NOT NULL,
	"farmId" integer NOT NULL,
	CONSTRAINT "viewMap_pk" PRIMARY KEY ("mapId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "prospects" ADD CONSTRAINT "prospects_fk0" FOREIGN KEY ("farmId") REFERENCES "farms"("farmId");
ALTER TABLE "prospects" ADD CONSTRAINT "prospects_fk1" FOREIGN KEY ("viewPipelineId") REFERENCES "viewPipeline"("viewPipelineId");

ALTER TABLE "viewPipeline" ADD CONSTRAINT "viewPipeline_fk0" FOREIGN KEY ("farmId") REFERENCES "farms"("farmId");

ALTER TABLE "farms" ADD CONSTRAINT "farms_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "viewMap" ADD CONSTRAINT "viewMap_fk0" FOREIGN KEY ("farmId") REFERENCES "farms"("farmId");
