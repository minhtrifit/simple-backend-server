-- ----------------------------
-- Table structure for tasks
-- ----------------------------
DROP TABLE IF EXISTS "tasks";
CREATE TABLE "tasks" (
  "id" int4 NOT NULL,
  "name" varchar(255) NOT NULL,
  "status" boolean NOT NULL
)
;

-- ----------------------------
-- Primary Key structure for table accounts
-- ----------------------------
ALTER TABLE "tasks" ADD CONSTRAINT "PK_Tasks" PRIMARY KEY ("id");

-- ----------------------------
-- Records of license
-- ----------------------------
BEGIN;
INSERT INTO "tasks" VALUES (1562, 'Doing homework', FALSE);
INSERT INTO "tasks" VALUES (2458, 'Chatting with crush', FALSE);
INSERT INTO "tasks" VALUES (4136, 'Learning Reactjs', FALSE);

COMMIT;