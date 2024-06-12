<template>
    <div class="100-vh d-flex flex-column align-items-center">
        <div style="width: 200px;" class="mt-5 img-wrap">
            <img src="../assets/img/logo/logo2.png" class="w-100" alt="logo">
        </div>
        <form class="mt-5 col-5">
            <div class="mb-3">
                <label for="exampleInputAcount" class="form-label">帳號</label>
                <input type="text" class="form-control" id="exampleInputAcount" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword" class="form-label">密碼</label>
                <input type="password" class="form-control" id="exampleInputPassword">
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="check">
                <label class="form-check-label" for="check">點我查看</label>
            </div>
            <button type="submit" class="btn btn-primary">提交</button>
        </form>
    </div>
</template>