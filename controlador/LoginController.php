<?php
include_once "../modelo/usuario.php";
session_start();
$user=$_POST['user'];
$pass=$_POST['pass'];
$usuario=new usuario();

if(!empty($_SESSION['us_tipo'])){
    switch($_SESSION['us_tipo']){ //se define a donde se redirige el usuario segun su tipo
            case 1:
                header('Location: ../vista/adm_catalogo.php');
                break;
            case 2:
                header("Location: ../vista/tec_catalogo.php");
                break;
            case 3:
                header("Location: ../USUARIO/index.php");
                break;    
            default:
    }
}
else{
    $usuario->Loguearse($user,$pass);
    if(!empty($usuario->objetos)){
        foreach($usuario->objetos as $objeto){
            $_SESSION['usuario']=$objeto->id_usuario;
            $_SESSION['us_tipo']=$objeto->us_tipo;
            $_SESSION['nombre_us']=$objeto->nombre_us;
        }
        switch($_SESSION['us_tipo']){//se define a donde se redirige el usuario segun su tipo
            case 1:
                header('Location: ../vista/adm_catalogo.php');
                break;
            case 2:
                header("Location: ../vista/tec_catalogo.php");
                break;
            case 3:
                header("Location: ../USUARIO/index.php");
                break;    
            default:
        } 
    }
    else{
        header('Location: ../vista/login.php');
    }
}
    
?>