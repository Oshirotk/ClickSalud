<?php
session_start();
if($_SESSION['us_tipo']==3) //el id 3 viene a ser el admi
{    
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usuario</title>
</head>
<body>
    <h1>Hola Usuario</h1>
    <a href="../controlador/Logout.php">Cerrar Sesion</a>
</body>
</html>
<?php
}
else{
    header('Location: ../vista/login.php');
}
?>