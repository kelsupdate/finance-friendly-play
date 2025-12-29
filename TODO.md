# Fix STK Push Edge Function Error

## Investigation Results
- Edge function is deployed and accessible
- Error "Edge function returned a non-2xx status code" indicates function returns 500 status
- Most likely cause: Missing PayHero API credentials in Supabase environment

## Tasks
- [x] Identified the issue: Missing PayHero API credentials
- [x] Received PayHero API credentials from user
- [ ] Configure PAYHERO_API_KEY and PAYHERO_API_SECRET in Supabase dashboard
- [ ] Update channel_id from 4691 to 3902 (account ID)
- [ ] Test the function after credentials are configured
- [ ] Verify PayHero API endpoint and payload format if issues persist
