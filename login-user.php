<?php require_once "login-php-script/controllerUserData.php"; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login Form</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
    <center><img class="logo" src="images/adminlogo.png" /></center>
        <div class="row">

            <div class="col-md-4 offset-md-4 form login-form">
                <!-- start ng form -->
                <form action="login-user.php" method="POST" autocomplete="">
                    <h2 class="text-center">CAMPUS LOGGING SYSTEM ADMIN</h2>
                    <p class="text-center">LOGIN</p>
                    <?php
                    if(count($errors) > 0){
                        ?>
                        <div class="alert alert-danger text-center">
                            <?php
                            // fething errors from the array
                            foreach($errors as $showerror){
                                echo $showerror;
                            }
                            ?>
                        </div>
                        <?php
                    }
                    ?>
                    <div class="form-group">
                        <input class="form-control" type="text" name="email" placeholder="username" required value="<?php echo $email ?>">
                    </div>
                    <div class="form-group">
                        <input class="form-control" type="password" name="password" placeholder="Password" required>
                    </div>
                    <div class="link forget-pass text-left"><a href="forgot-password.php">Forgot password?</a></div>
                    <div class="form-group">
                        <input class="form-control button" type="submit" name="login" value="Login">
                    </div>
             
                </form>
            </div>
        </div>
    </div>
    
</body>
</html>