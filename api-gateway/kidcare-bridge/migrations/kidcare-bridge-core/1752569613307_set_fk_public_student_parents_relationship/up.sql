alter table "public"."student_parents"
  add constraint "student_parents_relationship_fkey"
  foreign key ("relationship")
  references "public"."student_prarent_relationships"
  ("relationship") on update restrict on delete restrict;
