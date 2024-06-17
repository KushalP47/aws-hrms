'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import type { Auth, UserCredential } from 'firebase/auth';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { paths } from '../../../paths';
import { getFirebaseAuth } from '../../../lib/auth/firebase/client';
import { RouterLink } from '../../../components/core/link';
import { DynamicLogo } from '../../../components/core/logo';
import { toast } from '../../../components/core/toaster';
import { getSiteURL } from '@/lib/get-site-url';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { schema, signUpSchema, Values, GoogleValues } from '@/types/user';
import type { signUPSchema} from '@/types/user';
import { storeSignUpData, storeTeamId } from '@/lib/firestore/storeSignupData';
import { BackgroundElement1 } from './background-border';
import { BackgroundElement2 } from './background-border';
import {DevTool} from '@hookform/devtools';
import { OtpInput } from './otp-layout';
import nodemailer from 'nodemailer';

interface OAuthProvider {
  id: 'google' | 'github' | 'microsoft';
  name: string;
  logo: string;
}

const oAuthProviders = [
  { id: 'google', name: 'Google', logo: '/assets/logo-google.svg' },
  { id: 'microsoft', name: 'Microsoft', logo: '/assets/logo-microsoft.svg' },
] satisfies OAuthProvider[];

// change signup schema, add otp in it
const defaultValues = { name: '', email: '', password: '', otp: ''} satisfies signUPSchema;

export function SignUpForm(): React.JSX.Element {
  const [firebaseAuth] = React.useState<Auth>(getFirebaseAuth());
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [inviteId, setInviteId] = React.useState<string | null>(null);
  const [step, setStep] = React.useState<number>(1);
  const [otp, setOtp] = React.useState<string>("");

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const inviteIdFromQuery = queryParams.get('inviteId');
    if (inviteIdFromQuery) setInviteId(inviteIdFromQuery);
  }, []);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<signUPSchema>({ defaultValues, resolver: zodResolver(signUpSchema) });

  const onAuth = React.useCallback(
    async (providerId: OAuthProvider['id']): Promise<void> => {
      setIsPending(true);

      let provider: GoogleAuthProvider;

      switch (providerId) {
        case 'google':
          provider = new GoogleAuthProvider();
          break;
        default:
          throw new Error(`Unknown provider: ${providerId}`);
      }

      try {
        const userCredential =  await signInWithPopup(firebaseAuth, provider);

        await sendEmailVerification(userCredential.user, {
          url: getSiteURL()
        })

        const user = userCredential.user;
        const [firstName, lastName] = user.displayName?.split(' ', 2) || [];
        const googleValues: GoogleValues = {
          firstName: firstName || '',
          lastName: lastName || '',
          email: user.email || ""
        }

        await storeSignUpData(userCredential, { ...googleValues, password: "", terms: true }).then(() => {
          toast.success("Account Created successfully!!!")
        }).catch((err) => {
          toast.error((err as { message: string }).message);
        })
        await storeTeamId(inviteId ?? "", userCredential);

        setIsPending(false);
      } catch (err) {
        setIsPending(false);
        toast.error((err as { message: string }).message);
      }
    },
    [firebaseAuth, inviteId]
  );

  const otpVerification = async (otpValue: string): Promise<Boolean> => {
    if(otp === otpValue){
      console.log("OTP Verified");
      return true;
    } else {
      console.log("OTP Not Verified");
      return false;
    }
  }

  const sendOTP = async (email: string, otp: string): Promise<void> => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`);
      } catch (error) {
        console.error('Error sending OTP:', error);
      }
  }

  
  const onSubmit = React.useCallback(
    async (values: signUPSchema): Promise<void> => {
      if(step === 3){
        
        const email: string = values.email;
        const otpValue: string = String(Math.floor(1000 + Math.random() * 9000));
        setOtp(otpValue);

        try {
            await sendOTP(email, otpValue);
            handleContinue();
        } catch (error) {
            setError('root', { type: 'server', message: (error as { message: string }).message });
            setIsPending(false);
        }

      }else{
        setIsPending(true);
        console.log(values);
        handleContinue();
        // console.log(values);
    
        try {
            const isOtpVerified = await otpVerification(values.otp);
            if(isOtpVerified){
                const userData:Values = { firstName:'', lastName:'', email:values.email, terms:true,password:values.password};
                // Extract first and last name from firstName field
                const spaceIndex = values.name.indexOf(' ');
                if (spaceIndex !== -1) {
                    userData.lastName = values.name.slice(spaceIndex + 1);
                    userData.firstName = values.name.slice(0, spaceIndex);
                } else {
                    userData.firstName = values.name;
                    userData.lastName = '';
                }
                const userCredential = await createUserWithEmailAndPassword(firebaseAuth, userData.email, userData.password);
                const user = userCredential.user;

                
                await storeSignUpData(userCredential, userData);
                await sendEmailVerification(user, {
                url: getSiteURL()
                })
                await storeTeamId(inviteId ?? "",userCredential);

            
                toast.success('Verification email sent. Check your inbox and verify your email to complete registration.');
                setIsPending(false);
            }else{
                toast.error('OTP Verification Failed');
                setIsPending(false);
                setError('root', { type: 'server', message: 'OTP Verification Failed' });
            }
        } catch (err) {
            setError('root', { type: 'server', message: (err as { message: string }).message });
            setIsPending(false);
        }
      }
    },
    [firebaseAuth, setError, inviteId]
  );
  
  
  const handleContinue = () => {
    console.log("Continue");
    setStep((prevStep) => prevStep + 1);
  };



  return (
    <Stack spacing={4}>
      <BackgroundElement1 />
      <BackgroundElement2 />
     <form onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && (
        <Stack spacing={4}>
        <Stack spacing={1} alignItems="center">
        <Typography variant="h5">Sign up</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?{' '}
          <Link component={RouterLink} href={paths.auth.firebase.signIn} variant="subtitle2">
            Sign in
          </Link>
        </Typography>
      </Stack>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <FormControl error={Boolean(errors.email)}>
                  <InputLabel>Work E-mail</InputLabel>
                  <OutlinedInput {...field}sx={{backgroundColor: "white"}} type="email" />
                  {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
            <Button disabled={isPending}  onClick={handleContinue} variant="contained">
              Continue
            </Button>
          </Stack>
          <Divider>or</Divider>
          <Stack spacing={4}>
            <Stack spacing={4}>
              {oAuthProviders.map((provider) => (
                <Button
                sx={{backgroundColor: "white"}}
                  color="secondary"
                  disabled={isPending}
                  startIcon={<Box alt="" component="img" height={24} src={provider.logo} width={24} />}
                  key={provider.id}
                  onClick={() => {
                    onAuth(provider.id).catch(() => {
                      // noop
                    });
                  }}
                  variant="outlined"
                >
                  Continue with {provider.name}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Stack>
      )}

      {step === 2 && (
        <>
        <Stack spacing={1} alignItems="center">
        <Typography variant="h5">Set Your Name</Typography>
        <Typography color="text.secondary" variant="body2">
          To start, What is your name?{' '}
        </Typography>
      </Stack>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <FormControl error={Boolean(errors.name)}>
                <InputLabel>Name</InputLabel>
                <OutlinedInput {...field} sx={{backgroundColor: "white"}}/>
                {errors.name ? <FormHelperText>{errors.name.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Button disabled={isPending} onClick={handleContinue} variant="contained">
            Continue
          </Button>
        </Stack>
        </>
      )}
      

      {step === 3 && (
        <>
        <Stack spacing={1} alignItems="center">
        <Typography variant="h5">Pick a Password</Typography>
        <Typography color="text.secondary" variant="body2">
          Now set your password with atleast 8 characters{' '}
        </Typography>
      </Stack>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput {...field} sx={{backgroundColor: "white"}} type="password" />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Button disabled={isPending} type="submit" variant="contained">
            Continue
          </Button>
        </Stack>
        </>
      )}
    {/* </form> */}
    {/* <DevTool control={control}/> */}
    {step === 4 && (
          <Stack spacing={2} alignItems="center">
            <Typography variant="h5">Verify E-Mail</Typography>
            <Typography color="text.secondary" variant="body2">
              Enter the OTP which was sent to your E-Mail
            </Typography>
            <OtpInput value={otp} valueLength={4} onChange={setOtp}/>
            <Button
              disabled={isPending}
              type="submit"
              variant="contained"
              sx={{ width: '200px' }} // Adjust the width as needed
            >
              Submit
            </Button>
            <Typography color="text.secondary" variant="body2">
              Didn’t receive OTP?{' '}
              <Link component="button" onClick={sendOTP} variant="subtitle2">
                Resend OTP
              </Link>
            </Typography>
          </Stack>
      )}
    </form>
    </Stack>
  );
}