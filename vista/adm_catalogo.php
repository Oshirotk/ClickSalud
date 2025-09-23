<?php
session_start();
if($_SESSION['us_tipo']==1) //el id 1 viene a ser el admi
{
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administrador</title>
</head>
<body>
    <h1>Hola Admin</h1>
    <a href="../controlador/Logout.php">Cerrar Sesion</a>
</body>
</html>
<?php
}
else{
    header('Location: ../vista/login.php');
}
?>