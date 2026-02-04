import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../../Components/UI/Input';
import styles from './LoginPage.module.css';
import heroImage from '../../assets/images/login-hero.jpg';

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log('Login submitted:', data);
        navigate('/home');
    };

    return (
        <div className={styles.container}>
            {/* Left Side - Form */}
            <div className={styles.formSection}>
                <div className={styles.formContainer}>
                    <div className={styles.header}>
                        
                        <h1 className={styles.title}>Bem-vindo de volta</h1>
                        <p className={styles.subtitle}>Por favor, insira os seus dados para entrar.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <Input
                            id="email"
                            type="email"
                            label="Email"
                            placeholder="Insira o seu email"
                            error={errors.email?.message}
                            {...register("email")}
                        />
                        <Input
                            id="password"
                            type="password"
                            label="Senha"
                            placeholder="Insira a sua senha"
                            error={errors.password?.message}
                            {...register("password")}
                        />

                        <div className={styles.forgotPasswordContainer}>
                            <Link to="/forgot-password" className={styles.forgotPasswordLink}>Esqueceu a senha?</Link>
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            Entrar
                        </button>
                    </form>
                            <div style={{textAlign:"center", fontSize:"9pt"}}><small>Criado Pela Conexio Viva</small></div>
                 
                </div>
            </div>

            {/* Right Side - Image */}
            <div className={styles.imageSection} style={{ backgroundImage: `url(${heroImage})` }}>
                <div className={styles.imageOverlay}>
                    <h2 className={styles.imageTitle}>
                        Comece a Gerir Recursos Hospitalares com Confiança.
                    </h2>
                    <p className={styles.imageSubtitle}>
                        Faça login para monitorar stock, serviços, equipa e operações diárias num sistema centralizado e seguro.
                    </p>
                    <div className={styles.trustBadge}>
                        <span className={styles.stars}>★★★★★</span>
                        <span className={styles.trustText}>Confiado por equipas de saúde</span>
                        <div className={styles.trustSubtext}>Um sistema seguro e confiavel para ajudar você!</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
