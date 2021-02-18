insert into users
    ("fullName","phoneNumber","email","password","image")
    VALUES
        ('John Smith','8003507777','jsmith@example.com','hello111','https://www.seekpng.com/png/detail/106-1062139_free-clipart-of-a-faceless-business-man-avatar.png'),
        ('Jane Sloane','8002550080','jsloane@example.com','1234','https://www.pikpng.com/pngl/m/159-1591559_flat-faces-icons-circle-girl-flat-icon-png.png');

insert into farms
    ("farmName","userId")
    VALUES
        ('Champagne Cir in Irvine',1);

insert into "viewPipeline"
    ("viewPipelineId","farmId")
    VALUES
        (1,1);
    
insert into prospects
    ("prospectId","address","name","phoneNumber","email","interestInSelling","neighborhoodComplaints","notes","prospectStatus","farmId","viewPipelineId")
    VALUES
        (1,'15202 Champagne Cir, Irvine, CA','Leslie Alexander','9492224545','leslie.alexander@example.com',true,'Neighbors too loud at night','Contemplates moving to Temecula in 2 years','good',1,1),
        (2,'15203 Champagne Cir, Irvine, CA','Ronald Richards','9493335454','ronald.richards@example.com',false,'none','Loves soccer. Plays on the weekend.','Needs attention',1,1);

insert into "viewMap"
    ("mapId","farmId")
    VALUES
        (1,1);